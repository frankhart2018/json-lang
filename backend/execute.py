import argparse
import json
import os


def main():
    parser = argparse.ArgumentParser(description="JSON Language")
    parser.add_argument("file", help="JSON file to execute")

    args = parser.parse_args()

    with open(args.file) as f:
        data = json.load(f)

    stack = []

    for obj in data:
        instruction = obj["instruction"]
        values = obj["values"]
        action = obj.get("action", None)

        with open(os.path.join("instructions", f"{instruction}.json")) as f:
            instruction_executor = json.load(f)

        processor = instruction_executor["processor"]
        inputs = instruction_executor.get("inputs", None)

        assert len(values) == len(inputs)

        code = processor
        for input_, value in zip(inputs, values):
            value_type = value["type"]
            value_value = value["value"]

            if value_type == "special":
                if value_value == "get_stack":
                    value_value = stack.pop()

            if value_type == "string":
                value_value = f'"{value_value}"'

            code = code.replace(input_, str(value_value))

        if action == "store_stack":
            code = f"stack.append({code})"

        exec(code)


if __name__ == "__main__":
    main()

import sys
import json

def compare_files(output_file_path, test_file_path):
    try:
        with open(output_file_path, 'r') as output_file:
            output_file_content = output_file.read()
        with open(test_file_path, 'r') as test_file:
            test_file_content = test_file.read().rstrip()
        test_file_content = test_file_content[1:]
        print(f"Output file content: {output_file_content}")
        print(f"Test file content: {test_file_content}")
        return output_file_content == test_file_content
    except Exception as e:
        print(f"Error comparing files: {e}")
        return False

if __name__ == "__main__":
    json_file_path = sys.argv[1]
    txt_file_path = sys.argv[2]

    if compare_files(json_file_path, txt_file_path):
        print("Files are IDENTICAL")
    else:
        print("Files are NOT IDENTICAL")

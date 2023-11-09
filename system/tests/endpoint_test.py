import requests
import json

# ANSI color codes
ANSI_COLOR_GREEN = '\033[92m'  # '\033[92m' is the ANSI code for green
ANSI_COLOR_YELLOW ='\033[93m'
ANSI_COLOR_RED ='\033[91m'
ANSI_COLOR_RESET = '\033[0m'  # '\033[0m' resets the color to default

with open('http_test.json', 'r') as file:
    data = json.load(file)

tests = data["tests"]
succesful_tests = 0
failed_tests = []
total_test = len(tests)
iterator = 0
# Process each HTTP request
for test in tests:
    iterator += 1
    current_test = iterator
    res = {}

    # Get general request info
    method = test.get("method")
    uri = test.get("uri")
    req_body = test.get("body")
    expected_status = test.get("expectedStatus")

    # Get headers 
    headers = test.get("headers") or {}

    # if len(headers) > 0:
    #     headers = [{x[0]: x[1]} for x in test["headers"]]
    #     print("Headers:", headers)

    # Send the request
    print("Sending request", f'{current_test}/{total_test}', end='\r')
    
    if method == "POST":
        res = requests.post(uri, data=req_body, headers=headers)
    if method == "GET":
        res = requests.get(uri, data=req_body, headers=headers)

    if res.status_code == expected_status:
        succesful_tests += 1
    else: 
        # Note which test failed.
        failed_tests.append({
            'method': method, 
            'uri':uri, 
            'req_body':req_body, 
            'status': res.status_code, 
            'expected_status': expected_status
        })
print("")

# Choose color for printing success.
result_color = ANSI_COLOR_RED
if succesful_tests == total_test:
    result_color = ANSI_COLOR_GREEN
elif succesful_tests > 0: 
    result_color = ANSI_COLOR_YELLOW

# Print successes and fails

print(f'{result_color}{succesful_tests}/{total_test}{ANSI_COLOR_RESET}')
if not len(failed_tests) == 0:
    print(ANSI_COLOR_RED, end='')
    for fail in failed_tests:
        print(f'{fail["method"]} request to {fail["uri"]} yielded {fail["status"]} istead of expected {fail["expected_status"]}')
    print(ANSI_COLOR_RESET)

  
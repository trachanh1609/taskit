# !/usr/bin/env python3
import json
import requests
from http.server import BaseHTTPRequestHandler, HTTPServer

STATE_1 = 0.0
STATE_2 = 5400.0

# METHODS:
# /list - to get all data from REAL API for user1
# /user/1 - to get REAL data from account + some FAKE data
# /user/1 - FAKE DATA
# /pay/1/<float> - pay float for user 1
# /pay/2/<float> - pay float for user 2

class serveNordea(BaseHTTPRequestHandler):
    CLIENT_PUBLIC = ""
    CLIENT_SECRET = ""
    HEADERS = {
        "x-ibm-client-id": CLIENT_PUBLIC,
        "x-ibm-client-secret": CLIENT_SECRET,
        "authorization": "Bearer XXX"
    }

    def balancer(self, user_balance, state):
        return str(float(user_balance) + float(state))


    def do_GET(self):
        if self.path == "/user/1":
            self.serveUserOne()
            return
        if self.path == "/user/2":
            self.serveUserTwo()
            return
        if "/pay/2" in self.path:
            self.servePaymentForTwo()
            return
        if "/pay/1" in self.path:
            print(self.path)
            self.servePaymentForOne()
            return
        if self.path == "/list":
            accountId = "FI6593857450293470-EUR"
            endpoint = f'''https://api.hackathon.developer.nordeaopenbanking.com/v2/accounts/{accountId}/transactions'''
            result = requests.get(endpoint, headers=self.HEADERS)
            transactions = json.loads(result.text)
            resp = []
            for tr in transactions['response']['transactions']:
                if tr.get('creditorName', ""):
                    resp.append({
                        "amount": tr['amount'] + " " + tr['currency'],
                        "descr": tr['creditorName']
                    })
            self.send_response(200)            
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(bytes(json.dumps(resp), "utf8"))
            return
        else:
            print(self.path)

    def serveUserOne(self):
        accountId = "FI6593857450293470-EUR"
        endpoint = f'''https://api.hackathon.developer.nordeaopenbanking.com/v2/accounts/{accountId}'''
        result = requests.get(endpoint, headers=self.HEADERS)
        user = json.loads(result.text)
        print(user)
        resp = {
            "availableBalance": self.balancer(user['response']['availableBalance'], STATE_1) + " " + user['response']['currency']
        }
        self.send_response(200)        
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(bytes(json.dumps(resp), "utf8"))

    def serveUserTwo(self):
        resp = {
            "availableBalance": self.balancer(0.0, STATE_2) + " EUR"
        }
        self.send_response(200)
        self.send_header('Content-type', 'application/json')        
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(bytes(json.dumps(resp), "utf8"))

    def servePaymentForOne(self):
        amount = self.path.split('/')[-1]
        global STATE_1
        global STATE_2
        STATE_1 += float(amount)
        STATE_2 -= float(amount)

    def servePaymentForTwo(self):
        amount = self.path.split('/')[-1]
        global STATE_1
        global STATE_2
        STATE_1 += float(amount)
        STATE_2 += float(amount)

def run():
    print('starting server...')
    server_address = ('127.0.0.1', 8081)
    httpd = HTTPServer(server_address, serveNordea)
    print('running server...')
    httpd.serve_forever()

run()
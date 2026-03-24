#!/usr/bin/env python3
"""Simple preview server for Modera Publishing Tool prototype."""
import http.server
import socketserver
import os
import webbrowser
import threading

PORT = 8080
ROOT = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)
    def log_message(self, fmt, *args):
        pass  # suppress logs

def open_browser():
    import time
    time.sleep(0.5)
    webbrowser.open(f'http://localhost:{PORT}/prototype/ep3-inventory-pipeline.html')

print(f"Modera prototype server → http://localhost:{PORT}/prototype/ep3-inventory-pipeline.html")
print("Press Ctrl+C to stop.")
threading.Thread(target=open_browser, daemon=True).start()

with socketserver.TCPServer(('', PORT), Handler) as httpd:
    httpd.serve_forever()

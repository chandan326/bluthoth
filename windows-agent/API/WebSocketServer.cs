using System;
using System.Collections.Concurrent;
using System.Net;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BlueHubAgent.API
{
    public class LocalWebSocketServer
    {
        private readonly HttpListener _listener = new HttpListener();
        private readonly ConcurrentDictionary<string, WebSocket> _clients = new ConcurrentDictionary<string, WebSocket>();

        public event Func<string, Task>? OnMessageReceived;

        public async Task StartAsync(string prefix = "http://localhost:8765/")
        {
            _listener.Prefixes.Add(prefix);
            _listener.Start();
            Console.WriteLine($"[BlueHub C# Agent] Local WebSocket IPC Listening on {prefix}...");

            while (_listener.IsListening)
            {
                try
                {
                    var context = await _listener.GetContextAsync();
                    if (context.Request.IsWebSocketRequest)
                    {
                        ProcessWebSocketRequest(context);
                    }
                    else
                    {
                        context.Response.StatusCode = 400;
                        context.Response.Close();
                    }
                }
                catch (Exception ex)
                {
                    if (!_listener.IsListening) break;
                    Console.WriteLine($"[BlueHub C# Agent] HTTP Listener error: {ex.Message}");
                }
            }
        }

        private async void ProcessWebSocketRequest(HttpListenerContext context)
        {
            WebSocketContext wsContext = await context.AcceptWebSocketAsync(subProtocol: null);
            WebSocket ws = wsContext.WebSocket;
            string clientId = Guid.NewGuid().ToString();
            _clients.TryAdd(clientId, ws);

            Console.WriteLine($"[BlueHub C# Agent] Client connected: {clientId}");

            byte[] buffer = new byte[4096];
            while (ws.State == WebSocketState.Open)
            {
                try
                {
                    var result = await ws.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
                    if (result.MessageType == WebSocketMessageType.Close)
                    {
                        await ws.CloseAsync(WebSocketCloseStatus.NormalClosure, "Closing", CancellationToken.None);
                        break;
                    }

                    string message = Encoding.UTF8.GetString(buffer, 0, result.Count);
                    if (OnMessageReceived != null)
                    {
                        await OnMessageReceived.Invoke(message);
                    }
                }
                catch
                {
                    break;
                }
            }

            _clients.TryRemove(clientId, out _);
            Console.WriteLine($"[BlueHub C# Agent] Client disconnected: {clientId}");
        }

        public async Task BroadcastAsync(string payload)
        {
            byte[] bytes = Encoding.UTF8.GetBytes(payload);
            foreach (var kvp in _clients)
            {
                if (kvp.Value.State == WebSocketState.Open)
                {
                    try
                    {
                        await kvp.Value.SendAsync(new ArraySegment<byte>(bytes), WebSocketMessageType.Text, true, CancellationToken.None);
                    }
                    catch { }
                }
            }
        }
    }
}

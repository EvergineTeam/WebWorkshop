using Evergine.Common.Graphics;
using Evergine.Framework;
using Evergine.Framework.Graphics;
using Evergine.Framework.Services;
using Evergine.OpenGL;
using Evergine.Web;
using Evergine.Workshop.Features.Shapes;
using Evergine.Workshop.Web.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Diagnostics;

namespace Evergine.Workshop.Web
{
    public class Program
    {
        private static readonly Dictionary<string, WebSurface> appCanvas = new Dictionary<string, WebSurface>();
        private static JsonSerializerSettings serializationSettings = new JsonSerializerSettings()
        {
            ContractResolver = new CamelCasePropertyNamesContractResolver(),
            Formatting = Formatting.Indented
        };
        private static WindowsSystem windowsSystem;
        private static MyApplication application;
        private static Evergine.Web.WebAssembly wasm;

        public static void Main()
        {
            // Hack for AOT dll dependencies
            var cp = new Evergine.Components.Graphics3D.Spinner();

            // Create app
            application = new MyApplication();
            ApplicationState.OnEntitySelected += Application_EntitySelected;

            // Create Services
            windowsSystem = new WebWindowsSystem();
            application.Container.RegisterInstance(windowsSystem);

            // Wasm instance need to be initialized here for debugger
            wasm = Evergine.Web.WebAssembly.GetInstance();
        }

        public static void Run(string canvasId)
        {
            var canvas = wasm.GetElementById(canvasId);
            var surface = (WebSurface)windowsSystem.CreateSurface(canvas);
            appCanvas[canvasId] = surface;
            ConfigureGraphicsContext(application, surface);

            // Audio is currently unsupported
            //var xaudio = new Evergine.XAudio2.XAudioDevice();
            //application.Container.RegisterInstance(xaudio);

            Stopwatch clockTimer = Stopwatch.StartNew();
            windowsSystem.Run(
                () =>
                {
                    application.Initialize();
                    wasm.Invoke("window._evergine_ready");
                },
                () =>
                {
                    var gameTime = clockTimer.Elapsed;
                    clockTimer.Restart();

                    application.UpdateFrame(gameTime);
                    application.DrawFrame(gameTime);
                });
        }

        private static void Application_EntitySelected(object sender, ShapeComponent shape)
        {

            var eventData = JsonConvert.SerializeObject(new ShapeEvent
            {
                Type = "SelectedShape",
                Payload = new
                {
                    EntityName = shape.GetEntityName(),
                    Color = shape.Color.ToHexColorCode(),
                    ScaleFactor = shape.ScaleFactor
                }
            }, serializationSettings);

            wasm.Invoke("App.onEntitySelected", true, new[] { eventData });
        }

        public static object ChangeObjectProperties(string jsondata)
        {
            var entityInfo = JsonConvert.DeserializeObject<EntityInfo>(jsondata, serializationSettings);
            Console.WriteLine(entityInfo);
            var shapeComponent = ApplicationState.ShapeManager.GetSelectedShape();

            if (shapeComponent != null)
            {
                shapeComponent.Color = Color.FromHex(entityInfo.Color);
                shapeComponent.ScaleFactor = entityInfo.ScaleFactor;
                var resultStr = JsonConvert.SerializeObject(new EventResult
                {
                    Message = "Command Executed succesfully"
                });
                return resultStr;
            }

            return null;
        }

        public static void UpdateCanvasSize(string canvasId)
        {
            if (appCanvas.TryGetValue(canvasId, out var surface))
            {
                surface.RefreshSize();
            }
        }

        private static void ConfigureGraphicsContext(Application application, Surface surface)
        {
            // Enabled web canvas antialias (MSAA)
            //Runtime.InvokeJS("EGL.contextAttributes.antialias = true;");
            //Runtime.InvokeJS("EGL.contextAttributes.preserveDrawingBuffer = true;");

            GraphicsContext graphicsContext = new GLGraphicsContext(GraphicsBackend.WebGL2);
            graphicsContext.CreateDevice();
            SwapChainDescription swapChainDescription = new SwapChainDescription()
            {
                SurfaceInfo = surface.SurfaceInfo,
                Width = surface.Width,
                Height = surface.Height,
                ColorTargetFormat = PixelFormat.R8G8B8A8_UNorm,
                ColorTargetFlags = TextureFlags.RenderTarget | TextureFlags.ShaderResource,
                DepthStencilTargetFormat = PixelFormat.D24_UNorm_S8_UInt,
                DepthStencilTargetFlags = TextureFlags.DepthStencil,
                SampleCount = TextureSampleCount.None,
                IsWindowed = true,
                RefreshRate = 60
            };
            var swapChain = graphicsContext.CreateSwapChain(swapChainDescription);
            swapChain.VerticalSync = true;

            var graphicsPresenter = application.Container.Resolve<GraphicsPresenter>();
            var firstDisplay = new Display(surface, swapChain);
            graphicsPresenter.AddDisplay("DefaultDisplay", firstDisplay);

            application.Container.RegisterInstance(graphicsContext);
        }
    }
}

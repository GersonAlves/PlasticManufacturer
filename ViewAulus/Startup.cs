using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ViewAulus.Startup))]
namespace ViewAulus
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}

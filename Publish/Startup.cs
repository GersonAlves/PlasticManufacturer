using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Publish.Startup))]
namespace Publish
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}

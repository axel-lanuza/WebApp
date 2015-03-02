using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.SessionState;

namespace WebApp
{
    public class Global : System.Web.HttpApplication
    {

        protected void Application_Start(object sender, EventArgs e)
        {
            MainServer.Init();
        }

        protected void Session_Start(object sender, EventArgs e)
        {
            HttpRequest request = Context.Request;
            if (request.CurrentExecutionFilePathExtension != ".asmx")
                MainServer.AddSessionLog(request.UserHostAddress, request.Browser.Browser, request.UserAgent);
        }

        protected void Application_BeginRequest(object sender, EventArgs e)
        {

        }

        protected void Application_AuthenticateRequest(object sender, EventArgs e)
        {

        }

        protected void Application_Error(object sender, EventArgs e)
        {

        }

        protected void Session_End(object sender, EventArgs e)
        {

        }

        protected void Application_End(object sender, EventArgs e)
        {

        }
    }
}
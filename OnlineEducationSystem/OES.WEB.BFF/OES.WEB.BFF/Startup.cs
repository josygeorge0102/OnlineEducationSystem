using Duende.Bff.Yarp;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.IdentityModel.Tokens.Jwt;
using System.IO;

namespace OES.WEB.BFF
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {


            services.AddControllersWithViews();
            

            services.AddBff()
                .AddRemoteApis();

            JwtSecurityTokenHandler.DefaultMapInboundClaims = false;
            services.AddAuthentication(options =>
            {
                options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
                options.DefaultSignOutScheme = OpenIdConnectDefaults.AuthenticationScheme;
            })
            .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, options =>
            {
                options.Cookie.Name = "__Host-bff";
                options.Cookie.SameSite = SameSiteMode.Strict;
            })
            .AddOpenIdConnect(OpenIdConnectDefaults.AuthenticationScheme, options =>
            {
                options.Authority = "https://localhost:5001";
                options.ClientId = "OES.WebAPP";
                options.ClientSecret = "secret";
                
                

                //saving the tokens so we can use them for later call to other services
                options.SaveTokens = true;

                //Dont cut the token short and get all tokens
                options.GetClaimsFromUserInfoEndpoint = true;

                //mapping from the claims in token to claims we want to use in our application
                //for custom claims mapping is necessary, std claims are mapped automatically
                //                                  "our_claims" => "claimsInToken"
                options.ClaimActions.MapUniqueJsonKey("role", "role");

                options.ResponseType = "code";
                //options.ResponseMode = "query";

                //options.ResponseMode = "form_post"; //can use query string as well(not recc. no TLS)

                options.SaveTokens = true;
                //options.UsePkce = true;
                //These 2 claims are added automatically but others but be requested explicitly
                options.Scope.Add("openid");
                options.Scope.Add("profile");
                options.Scope.Add("email");
                options.Scope.Add("role");
                options.Scope.Add("ClassroomServiceAPI.admin");
                options.Scope.Add("ClassroomServiceAPI.student");
                options.Scope.Add("ClassroomServiceAPI.teacher");
                options.Scope.Add("UserServiceAPI.admin");
                options.Scope.Add("UserServiceAPI.student");
                options.Scope.Add("UserServiceAPI.teacher");



                //options.TokenValidationParameters = new()
                //{
                //    NameClaimType = "name",
                //    RoleClaimType = "role"
                //};
            });

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
            
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseAuthentication();
            app.UseBff();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                //endpoints.MapControllerRoute(
                //    name: "default",
                //    pattern: "{controller}/{action=Index}/{id?}");

                endpoints.MapBffManagementEndpoints();
                //.RequireAuthorization();
                endpoints.MapRemoteBffApiEndpoint("/api/classroomservice", "https://localhost:7189/api/")
                .RequireAccessToken(Duende.Bff.TokenType.UserOrClient);

                endpoints.MapRemoteBffApiEndpoint("/api/userservice", "https://localhost:7095/api/")
                .RequireAccessToken(Duende.Bff.TokenType.UserOrClient);

            });

            app.UseSpa(spa =>
            {
                // spa.Options.SourcePath = "ClientApp";
                System.Console.WriteLine($"\n\n\nThe content root path is {env.ContentRootPath}");

                var srcPath = Path.Join(env.ContentRootPath, "ClientApp");
                System.Console.WriteLine($"\n\n\nThe source path is {srcPath}");
                spa.Options.SourcePath = srcPath;
                // spa.Options.SourcePath = Path.Join(env.ContentRootPath, workingDirectory))

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}

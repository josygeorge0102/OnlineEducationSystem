using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Reflection;
using UserServiceAPI.Models;
using UserServiceAPI.Repository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(
        setupAction =>
        {
            setupAction.SwaggerDoc(
                "UserServiceOpenAPISpecification",
                new Microsoft.OpenApi.Models.OpenApiInfo()
                {
                    Title = "Users API",
                    Version = "1"
                });

            var xmlCommentsFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
            var xmlCommentsFullPath = Path.Combine(AppContext.BaseDirectory, xmlCommentsFile);

            setupAction.IncludeXmlComments(xmlCommentsFullPath);
            setupAction.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
            {
                Name = "Authorization",
                Type = SecuritySchemeType.ApiKey,
                Scheme = "Bearer",
                BearerFormat = "JWT",
                In = ParameterLocation.Header,
                Description = "JWT Authorization header using the Bearer scheme. " +
                "\r\n\r\n Enter 'Bearer' [space] and then your token in the text input below.\r\n\r\nExample: \"Bearer 12345abcdef\"",
            });
            setupAction.AddSecurityRequirement(
               new OpenApiSecurityRequirement
               {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        }
                    },
                    Array.Empty<string>()

                }
               }
            );
        });

//Unsafe: move to Env. Variable
//var connectionString = builder.Configuration.GetConnectionString("LoginServiceDB");
builder.Services.AddDbContext<UserServiceDBContext>(
    options => options.UseSqlServer("Server=loginservicedb,1433;Database=LoginServiceDB;User ID=SA;Password=Pa55word!;MultipleActiveResultSets=true;"));

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

JwtSecurityTokenHandler.DefaultMapInboundClaims = false;
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    //.AddIdentityServerAuthentication(JwtBearerDefaults.AuthenticationScheme, options =>
    //{
    //    //options.Audience = "UserServiceAPI";
    //    options.ApiName = "UserServiceAPI";
    //    options.Authority = "https://localhost:5001/resources";
    //});
    .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
    {
        options.Authority = "https://localhost:5001";

        //see: https://docs.duendesoftware.com/identityserver/v6/apis/aspnetcore/jwt/
        //options.TokenValidationParameters.ValidateAudience = false;

        //Only access tokens for the UserServiceAPI audience(aka API resource name) are accepted
        //ie all the scopes under this API resource are only valid
        //https://docs.duendesoftware.com/identityserver/v6/fundamentals/resources/api_resources/
        options.Audience = "UserServiceAPI";

        // it's recommended to check the type header to avoid "JWT confusion" attacks
        options.TokenValidationParameters.ValidTypes = new[] { "at+jwt" };
    });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("IsStudent", policy =>
    policy.RequireClaim("role", "student"));

    options.AddPolicy("IsStudentOrTeacher", policy =>
    policy.RequireClaim("role", "student", "teacher"));

    options.AddPolicy("IsTeacher", policy =>
    policy.RequireClaim("role", "teacher"));

    options.AddPolicy("IsTeacherOrAdmin", policy =>
    policy.RequireClaim("role", "teacher", "admin"));

    options.AddPolicy("IsAdmin", policy =>
    policy.RequireClaim("role", "admin"));

    options.AddPolicy("IsStudentOrAdmin", policy =>
    policy.RequireClaim("role", "student", "admin"));
});

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(setupAction =>
    {
        setupAction.SwaggerEndpoint(
            "/swagger/UserServiceOpenAPISpecification/swagger.json",
            "User API");
        //Documentation available at root
        setupAction.RoutePrefix = "";
    });
}

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.Run();

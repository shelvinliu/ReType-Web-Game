using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using ReType.data;
using ReType.Data;
using ReType.Handler;

namespace ReType
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
            services.AddAuthentication("MyAuthentication").
            AddScheme<AuthenticationSchemeOptions, MyAuthHandler>
            ("MyAuthentication", null);
            services.AddDbContext<WebAPIDBContext>(options => options.UseSqlite(Configuration.GetConnectionString("WebAPIConnection")));
            services.AddControllers();
            services.AddScoped<IWebAPIRepo, DBWebAPIRepo>();
            //services.AddMvc(options => options.OutputFormatters.Add(new VCardOutputFormatter()));
            services.AddCors(options =>
            {
                options.AddPolicy("any", builder =>
                {
                    builder.WithOrigins("https://www.dxh000130.top").AllowCredentials().AllowAnyHeader().AllowAnyMethod();
                    //允许任何来源的主机访问
                });
            });
            services.AddAuthorization(options =>
            {
                options.AddPolicy("UserOnly", policy => policy.RequireClaim("userName"));
            }
        );

            //services.AddSwaggerGen(c =>
            //{
            //    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Assignment1", Version = "v1" });
            //});
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                //    app.UseSwagger();
                //    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Assignment1 v1"));
            }

            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseCors("any");
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers().RequireCors("any");
            });
        }

    }
}

using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Server.Service;

namespace Server
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    public void ConfigureServices(IServiceCollection services)
    {
      services.AddControllers();

      var secret = Configuration.GetSection("JwtConfig").GetSection("secret").Value;
      var key = Encoding.ASCII.GetBytes(secret);

      services.AddAuthentication(x =>
      {
        x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
      })
      .AddJwtBearer(x =>
      {
        x.TokenValidationParameters = new TokenValidationParameters
        {
          IssuerSigningKey = new SymmetricSecurityKey(key),
          ValidateIssuer = false,
          ValidateAudience = false
        };
      });

      services.AddScoped<ITaiKhoanService, TaiKhoanService>();
      services.AddScoped<IHocPhanService, HocPhanService>();
      services.AddScoped<ILopHocService, LopHocService>();
      services.AddScoped<ISinhVienService, SinhVienService>();
      services.AddScoped<IKhoCauHoiService, KhoCauHoiService>();
      services.AddScoped<ICauHoiService, CauHoiService>();
      services.AddScoped<IDeThiService, DeThiService>();
      services.AddScoped<ICaThiService, CaThiService>();
      services.AddScoped<IBaiLamService, BaiLamService>();
      services.AddScoped<IKetQuaService, KetQuaService>();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }

      app.UseHttpsRedirection();
      app.UseRouting();
      app.UseAuthentication();
      app.UseAuthorization();
      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
      });
    }
  }
}

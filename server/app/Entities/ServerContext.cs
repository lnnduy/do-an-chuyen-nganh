using Microsoft.EntityFrameworkCore;

namespace Server.Entity
{
  public class ServerContext : DbContext
  {
    public DbSet<TaiKhoan> TaiKhoanContext { get; set; }
    public DbSet<HocPhan> HocPhanContext { get; set; }

    public ServerContext() : base()
    { }

    public ServerContext(DbContextOptions options) : base(options)
    { }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
      options.UseSqlServer(@"Server=.\SQLEXPRESS;Database=DoAnChuyenNganh;Trusted_Connection=true");
    }
  }
}
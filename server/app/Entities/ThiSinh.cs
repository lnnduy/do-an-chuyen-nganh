using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Entity
{
  [Table("ThiSinh")]
  public class ThiSinh
  {
    public long IdSinhVien { get; set; }
    public long IdCaThi { get; set; }
    public int SoLanDangNhap { get; set; }
    public string TenMay { get; set; }
    public string DiaChiIp { get; set; }
    [DefaultValue("Chưa thi")]
    public string TrangThaiThi { get; set; }

    public virtual SinhVien SinhVien { get; set; }
    public virtual CaThi CaThi { get; set; }
  }
}
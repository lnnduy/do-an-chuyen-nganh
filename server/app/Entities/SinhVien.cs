using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Entity
{
  [Table("SinhVien")]
  public class SinhVien
  {
    public long Id { get; set; }
    public string MSSV { get; set; }
    public string HoTen { get; set; }
    public string GioiTinh { get; set; }
    public string SoDienThoai { get; set; }
    public string Email { get; set; }
    public string DiaChi { get; set; }

    public long IdLopHoc { get; set; }

    public virtual LopHoc LopHoc { get; set; }
    public virtual List<ThiSinh> DsCaThi { get; set; }
    public virtual List<BaiLam> DsBaiLam { get; set; }
  }
}
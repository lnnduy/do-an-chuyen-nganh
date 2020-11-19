using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Entity
{
  [Table("CaThi")]
  public class CaThi
  {
    [Key]
    public long Id { get; set; }
    public string TenCaThi { get; set; }
    public long ThoiGianBatDau { get; set; }
    public long ThoiGianThi { get; set; }
    public string TrangThai { get; set; }

    public long IdHocPhan { get; set; }
    public long IdLopHoc { get; set; }
    public long IdDeThi { get; set; }
    public long IdGiamThi { get; set; }

    public virtual HocPhan HocPhan { get; set; }
    public virtual LopHoc LopHoc { get; set; }
    public virtual DeThi DeThi { get; set; }
    public virtual TaiKhoan GiamThi { get; set; }
  }
}
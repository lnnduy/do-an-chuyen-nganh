using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Entity
{
  [Table("BaiLam")]
  public class BaiLam
  {
    public long IdCaThi { get; set; }
    public long IdSinhVien { get; set; }
    public long IdCauHoi { get; set; }
    public long IdDapAn { get; set; }

    public virtual CaThi CaThi { get; set; }
    public virtual SinhVien SinhVien { get; set; }
    public virtual CauHoi CauHoi { get; set; }
    public virtual DapAn DapAn { get; set; }
  }
}
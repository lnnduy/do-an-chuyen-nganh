using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Entity
{
  [Table("KhoCauHoi")]
  public class KhoCauHoi
  {
    [Key]
    public long Id { get; set; }
    public string TenKhoCauHoi { get; set; }
    public string MoTa { get; set; }

    public long IdHocPhan { get; set; }

    public virtual HocPhan HocPhan { get; set; }
  }
}
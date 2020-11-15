using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Entity
{
  [Table("DeThi")]
  public class DeThi
  {
    [Key]
    public long Id { get; set; }
    public string TenDeThi { get; set; }
    public bool DeThiThu { get; set; }
    public bool SanSang { get; set; }

    public long IdHocPhan { get; set; }

    public virtual HocPhan HocPhan { get; set; }
    public virtual List<ChiTietDeThi> DsCauHoi { get; set; }
  }
}
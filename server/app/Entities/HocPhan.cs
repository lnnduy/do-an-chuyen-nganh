using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Entity
{
  [Table("HocPhan")]
  public class HocPhan
  {
    [Key]
    public long Id { get; set; }
    public string TenHocPhan { get; set; }

    public virtual List<KhoCauHoi> DsKhoCauHoi { get; set; }
    public virtual List<DeThi> DsDeThi { get; set; }
  }
}
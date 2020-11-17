using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Entity
{
  [Table("CauHoi")]
  public class CauHoi
  {
    [Key]
    public long Id { get; set; }
    public string NoiDung { get; set; }
    public bool NhieuDapAn { get; set; }
    public string DoKho { get; set; }

    public long IdKhoCauHoi { get; set; }

    public virtual KhoCauHoi KhoCauHoi { get; set; }
    public virtual List<DapAn> DsDapAn { get; set; }
    public virtual List<ChiTietDeThi> DsDeThi { get; set; }
  }
}
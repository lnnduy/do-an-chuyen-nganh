using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Entity
{
  [Table("DapAn")]
  public class DapAn
  {
    [Key]
    public long Id { get; set; }
    public string NoiDung { get; set; }
    public bool DapAnDung { get; set; }

    public long IdCauHoi { get; set; }

    public virtual CauHoi CauHoi { get; set; }
    public virtual List<BaiLam> DsBaiLam { get; set; }
  }
}
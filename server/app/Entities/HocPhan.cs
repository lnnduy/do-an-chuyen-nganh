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
  }
}
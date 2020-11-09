using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Entities
{
  [Table("LopHoc")]
  public class LopHoc
  {
    [Key]
    public long Id { get; set; }
    public string TenLop { get; set; }
  }
}
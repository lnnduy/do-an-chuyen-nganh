using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Entity
{
  [Table("LopHoc")]
  public class LopHoc
  {
    [Key]
    public long Id { get; set; }
    public string TenLop { get; set; }

    public virtual List<SinhVien> DsSinhVien { get; set; }
    public virtual List<CaThi> DsCaThi { get; set; }
  }
}
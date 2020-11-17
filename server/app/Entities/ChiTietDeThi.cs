using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Entity {
  [Table("ChiTietDeThi")]
  public class ChiTietDeThi {
    public long IdDeThi { get; set; }
    public long IdCauHoi { get; set; }

    public virtual DeThi DeThi { get; set; }
    public virtual CauHoi CauHoi { get; set; }
  }
}
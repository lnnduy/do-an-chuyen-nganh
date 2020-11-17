using System.Collections.Generic;

namespace Server.Model.Request
{
  public class CapNhatDeThiRequest
  {
    public string TenDeThi { get; set; }
    public bool SanSang { get; set; }
    public List<long> DsIdCauHoi { get; set; }
  }
}
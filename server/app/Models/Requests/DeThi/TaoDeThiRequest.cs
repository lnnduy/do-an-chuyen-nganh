using System.Collections.Generic;

namespace Server.Model.Request
{
  public class TaoDeThiRequest
  {
    public string TenDeThi { get; set; }
    public bool DeThiThu { get; set; }
    public List<long> DsIdCauHoi { get; set; }
  }
}
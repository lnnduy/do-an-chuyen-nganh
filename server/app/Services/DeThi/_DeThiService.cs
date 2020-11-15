using Server.Repository;

namespace Server.Service
{
  public partial class DeThiService : IDeThiService
  {
    private readonly DeThiRepository _deThiRepo = new DeThiRepository();
    private readonly CauHoiRepository _cauHoiRepo = new CauHoiRepository();
    private readonly HocPhanRepository _hocPhanRepo = new HocPhanRepository();
  }
}
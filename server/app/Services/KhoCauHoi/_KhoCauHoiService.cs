using Server.Repository;

namespace Server.Service
{
  public partial class KhoCauHoiService : IKhoCauHoiService
  {
    private readonly KhoCauHoiRepository _khoCauHoiRepo = new KhoCauHoiRepository();
    private readonly HocPhanRepository _hocPhanRepo = new HocPhanRepository();
  }
}
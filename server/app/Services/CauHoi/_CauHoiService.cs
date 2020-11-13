using System.Threading.Tasks;
using Server.Entity;
using Server.Model.Request;
using Server.Model.Response;
using Server.Repository;

namespace Server.Service
{
  public partial class CauHoiService : ICauHoiService
  {
    private readonly CauHoiRepository _cauHoiRepo = new CauHoiRepository();
    private readonly DapAnRepository _dapAnRepo = new DapAnRepository();
    private readonly KhoCauHoiRepository _khoCauHoiRepo = new KhoCauHoiRepository();
  }
}
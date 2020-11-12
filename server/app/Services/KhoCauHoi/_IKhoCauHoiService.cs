using System.Collections.Generic;
using System.Threading.Tasks;
using Server.Entity;
using Server.Model.Request;
using Server.Model.Response;

namespace Server.Service
{
  public interface IKhoCauHoiService
  {
    Task<Response<List<KhoCauHoi>>> GetDsKhoCauHoi(long idHocHocPhan);
    Task<Response<KhoCauHoi>> ThemKhoCauHoiVaoHocPhan(long idHocPhan, TaoKhoCauHoiRequest request);
    Task<Response<KhoCauHoi>> CapNhatKhoCauHoi(long id, TaoKhoCauHoiRequest request);
    Task<Response> XoaKhoCauHoi(long id);
  }
}
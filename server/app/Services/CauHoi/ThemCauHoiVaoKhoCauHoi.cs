using System.Collections.Generic;
using System.Threading.Tasks;
using Server.Entity;
using Server.Model.Request;
using Server.Model.Response;

namespace Server.Service
{
  public partial class CauHoiService
  {
    public async Task<Response<CauHoi>> ThemCauHoiVaoKhoCauHoi(long idKhoCauHoi, TaoCauHoiRequest request)
    {
      var khoCauHoi = await _khoCauHoiRepo.GetKhoCauHoiById(idKhoCauHoi);

      if (khoCauHoi == null) return new Response<CauHoi>
      {
        StatusCode = 400,
        Success = false,
        Errors = new[] { "Không tìm thấy kho câu hỏi" }
      };

      var cauHoi = new CauHoi
      {
        NoiDung = request.NoiDung,
        DoKho = request.DoKho,
        NhieuDapAn = request.NhieuDapAn,
        IdKhoCauHoi = idKhoCauHoi
      };
      var dsDapAn = new List<DapAn>();

      foreach (var da in request.DsDapAn)
      {
        var dapAn = new DapAn
        {
          NoiDung = da.NoiDung,
          DapAnDung = da.DapAnDung
        };
        dsDapAn.Add(dapAn);
      }

      var newCauHoi = await _cauHoiRepo.CreateCauHoi(cauHoi, dsDapAn);

      return new Response<CauHoi>
      {
        StatusCode = 201,
        Success = true,
        Data = newCauHoi
      };
    }
  }
}
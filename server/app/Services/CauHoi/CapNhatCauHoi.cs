using System.Collections.Generic;
using System.Threading.Tasks;
using Server.Entity;
using Server.Model.Request;
using Server.Model.Response;

namespace Server.Service
{
  public partial class CauHoiService
  {
    public async Task<Response<CauHoi>> CapNhatCauHoi(long id, CapNhatCauHoiRequest request)
    {
      var cauHoi = await _cauHoiRepo.GetCauHoiById(id);

      if (cauHoi == null) return new Response<CauHoi>
      {
        StatusCode = 400,
        Success = false,
        Errors = new[] { "Không tìm thấy câu hỏi" }
      };

      cauHoi.NoiDung = request.NoiDung;
      cauHoi.NhieuDapAn = request.NhieuDapAn;
      cauHoi.DoKho = request.DoKho;

      var dsDapAnMoi = new List<DapAn>();

      if (request.DsDapAnMoi != null)
        foreach (var da in request.DsDapAnMoi)
        {
          var dapAn = new DapAn
          {
            NoiDung = da.NoiDung,
            DapAnDung = da.DapAnDung,
            IdCauHoi = cauHoi.Id
          };
          dsDapAnMoi.Add(dapAn);
        }

      var dsDapAnCanXoa = await _dapAnRepo.FindMultipleDapAnById(request.DsDapAnCanXoa);

      var updatedCauHoi = await _cauHoiRepo.UpdateCauHoi(
        cauHoi,
        dsDapAnMoi,
        request.DsDapAnCanCapNhat,
        dsDapAnCanXoa: dsDapAnCanXoa
      );

      updatedCauHoi.DsDapAn = _dapAnRepo.GetAll(updatedCauHoi.Id);

      return new Response<CauHoi>
      {
        StatusCode = 200,
        Success = true,
        Data = updatedCauHoi
      };
    }
  }
}
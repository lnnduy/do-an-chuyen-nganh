using System.Threading.Tasks;
using Server.Entity;
using Server.Model.Request;
using Server.Model.Response;

namespace Server.Service
{
  public partial class CaThiService
  {
    public async Task<Response<ThamGiaCaThiResponse>> ThamGiaCaThi(long idSinhVien, long idCaThi, ThamGiaCaThiRequest request)
    {
      var caThi = await _caThiRepo.GetCaThiById(idCaThi);

      if (caThi == null)
        return new Response<ThamGiaCaThiResponse>
        {
          StatusCode = 400,
          Success = false,
          Errors = new[] { "Không tìm thấy ca thi" }
        };

      var sinhVien = await _sinhVienRepo.GetSinhVienById(idSinhVien);

      if (sinhVien == null)
        return new Response<ThamGiaCaThiResponse>
        {
          StatusCode = 400,
          Success = false,
          Errors = new[] { "Không tìm thấy sinh viên" }
        };

      var thiSinh = await _thiSinhRepo.GetThiSinhById(idCaThi, idSinhVien);

      if (thiSinh == null)
        return new Response<ThamGiaCaThiResponse>
        {
          StatusCode = 400,
          Success = false,
          Errors = new[] { "Không tìm thấy thí sinh trong ca thi" }
        };

      if (caThi.MaBaoVe != request.MaBaoVe)
        return new Response<ThamGiaCaThiResponse>
        {
          StatusCode = 400,
          Success = false,
          Errors = new[] { "Mã bảo vệ không đúng" }
        };

      thiSinh.SoLanDangNhap += 1;
      thiSinh.TenMay = request.TenMay;
      thiSinh.DiaChiIp = request.DiaChiIp;

      await _thiSinhRepo.UpdateThiSinh(thiSinh);

      var thamGiaCaThiResponse = new ThamGiaCaThiResponse(caThi, thiSinh);

      return new Response<ThamGiaCaThiResponse>
      {
        StatusCode = 200,
        Success = true,
        Data = thamGiaCaThiResponse
      };
    }
  }
}
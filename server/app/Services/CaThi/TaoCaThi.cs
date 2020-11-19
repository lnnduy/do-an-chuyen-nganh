using System.Threading.Tasks;
using Server.Entity;
using Server.Enum;
using Server.Model.Request;
using Server.Model.Response;

namespace Server.Service
{
  public partial class CaThiService
  {
    public async Task<Response<CaThi>> TaoCaThi(long idHocPhan, TaoCaThiRequest request)
    {
      var hocPhan = await _hocPhanRepo.GetHocPhanById(idHocPhan);

      if (hocPhan == null)
        return new Response<CaThi>
        {
          StatusCode = 400,
          Success = false,
          Errors = new[] { "Không tìm thấy học phần" }
        };

      var caThi = new CaThi
      {
        TenCaThi = request.TenCaThi,
        ThoiGianBatDau = request.ThoiGianBatDau,
        ThoiGianThi = request.ThoiGianThi,
        TrangThai = TrangThaiCaThi.ChuaBatDau,
        IdHocPhan = idHocPhan,
        IdLopHoc = request.IdLopHoc,
        IdGiamThi = request.IdGiamThi,
        IdDeThi = request.IdDeThi
      };

      var newCaThi = await _caThiRepo.CreateCaThi(caThi);

      return new Response<CaThi>
      {
        StatusCode = 201,
        Success = true,
        Data = newCaThi
      };
    }
  }
}
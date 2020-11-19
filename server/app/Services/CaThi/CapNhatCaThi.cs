using System.Threading.Tasks;
using Server.Entity;
using Server.Model.Request;
using Server.Model.Response;

namespace Server.Service
{
  public partial class CaThiService
  {
    public async Task<Response<CaThi>> CapNhatCaThi(long id, TaoCaThiRequest request)
    {
      var caThi = await _caThiRepo.GetCaThiById(id);

      if (caThi == null)
        return new Response<CaThi>
        {
          StatusCode = 400,
          Success = false,
          Errors = new[] { "Không tìm thấy ca thi" }
        };

      caThi.TenCaThi = request.TenCaThi;
      caThi.ThoiGianBatDau = request.ThoiGianBatDau;
      caThi.ThoiGianThi = request.ThoiGianThi;
      caThi.IdLopHoc = request.IdLopHoc;
      caThi.IdGiamThi = request.IdGiamThi;
      caThi.IdDeThi = request.IdDeThi;

      var updatedCaThi = await _caThiRepo.UpdateCaThi(caThi);

      return new Response<CaThi>
      {
        StatusCode = 200,
        Success = true,
        Data = updatedCaThi
      };
    }
  }
}
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Model.Request;
using Server.Service;

namespace Server.Controller
{
  [Authorize]
  [ApiController]
  [Route("api/lop-hoc")]
  public class SinhVienController : ControllerBase
  {
    private readonly ISinhVienService _sinhVienService;

    public SinhVienController(ISinhVienService sinhVienService)
    {
      _sinhVienService = sinhVienService;
    }

    [HttpGet("{idLopHoc}/sinh-vien")]
    public IActionResult GetDanhSachLop(long idLopHoc)
    {
      var claim = User.Claims.FirstOrDefault(c => c.Type == "id");

      if (!User.Identity.IsAuthenticated || claim == null)
        return Unauthorized();

      var serviceResult = _sinhVienService.GetDanhSachLop(idLopHoc);

      return Ok(serviceResult);
    }

    [HttpPost("{idLopHoc}/sinh-vien")]
    public async Task<IActionResult> ThemSinhVienVaoLop(long idLopHoc, TaoSinhVienRequest request)
    {
      var claim = User.Claims.FirstOrDefault(c => c.Type == "id");

      if (!User.Identity.IsAuthenticated || claim == null)
        return Unauthorized();

      var serviceResult = await _sinhVienService.ThemSinhVienVaoLop(idLopHoc, request);

      return Ok(serviceResult);
    }
  }
}
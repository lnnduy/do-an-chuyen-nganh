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
  [Route("api/hoc-phan/{idHocPhan}/kho-cau-hoi")]
  public partial class KhoCauHoiController : ControllerBase
  {
    private readonly IKhoCauHoiService _khoCauHoiService;

    public KhoCauHoiController(IKhoCauHoiService khoCauHoiService)
    {
      _khoCauHoiService = khoCauHoiService;
    }

    [HttpGet("")]
    public async Task<IActionResult> GetDsKhoCauHoi(long idHocPhan)
    {
      var claim = User.Claims.FirstOrDefault(c => c.Type == "id");

      if (!User.Identity.IsAuthenticated || claim == null)
        return Unauthorized();

      var serviceResult = await _khoCauHoiService.GetDsKhoCauHoi(idHocPhan);

      return Ok(serviceResult);
    }

    [HttpPost("")]
    public async Task<IActionResult> ThemKhoCauHoiVaoHocPhan(long idHocPhan, TaoKhoCauHoiRequest request)
    {
      var claim = User.Claims.FirstOrDefault(c => c.Type == "id");

      if (!User.Identity.IsAuthenticated || claim == null)
        return Unauthorized();

      var serviceResult = await _khoCauHoiService.ThemKhoCauHoiVaoHocPhan(idHocPhan, request);

      return Ok(serviceResult);
    }
  }

  [Route("api/kho-cau-hoi/{id}")]
  public partial class KhoCauHoiController : ControllerBase
  {
    [HttpPut("")]
    public async Task<IActionResult> CapNhatKhoCauHoi(long id, TaoKhoCauHoiRequest request)
    {
      var claim = User.Claims.FirstOrDefault(c => c.Type == "id");

      if (!User.Identity.IsAuthenticated || claim == null)
        return Unauthorized();

      var serviceResult = await _khoCauHoiService.CapNhatKhoCauHoi(id, request);

      return Ok(serviceResult);
    }

    [HttpDelete("")]
    public async Task<IActionResult> XoaKhoCauHoi(long id)
    {
      var claim = User.Claims.FirstOrDefault(c => c.Type == "id");

      if (!User.Identity.IsAuthenticated || claim == null)
        return Unauthorized();

      var serviceResult = await _khoCauHoiService.XoaKhoCauHoi(id);

      return Ok(serviceResult);
    }
  }
}
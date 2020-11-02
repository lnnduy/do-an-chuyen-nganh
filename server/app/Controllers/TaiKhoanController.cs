using System;
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
  [Route("api/tai-khoan")]
  public class TaiKhoanController : ControllerBase
  {
    private readonly ITaiKhoanService _taiKhoanService;

    public TaiKhoanController(ITaiKhoanService taiKhoanService)
    {
      _taiKhoanService = taiKhoanService;
    }

    [AllowAnonymous]
    [HttpPost("dang-nhap")]
    public IActionResult SignIn(SignInRequest request)
    {
      var serviceResult = _taiKhoanService.SignIn(request);
      return Ok(serviceResult);
    }

    [HttpGet("")]
    public async Task<IActionResult> Authenticate()
    {
      var claim = User.Claims.FirstOrDefault(c => c.Type == "id");

      if (!User.Identity.IsAuthenticated || claim == null)
        return Unauthorized();

      var idTaiKhoan = Convert.ToInt64(claim.Value);
      var serviceResult = await _taiKhoanService.GetAuthData(idTaiKhoan);

      return Ok(serviceResult);
    }
  }
}
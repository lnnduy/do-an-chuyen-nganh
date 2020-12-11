using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
  public partial class AddColumnToTable_TrangThaiThi_ThiSinh : Migration
  {
    protected override void Up(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.AddColumn<string>(
        name: "TrangThaiThi",
        table: "ThiSinh",
        defaultValue: "Chưa thi",
        nullable: true);
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.DropColumn(
        name: "TrangThaiThi",
        table: "ThiSinh");
    }
  }
}

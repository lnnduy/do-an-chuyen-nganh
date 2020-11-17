using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class AddTable_DapAn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DapAn_CauHoi_CauHoiId",
                table: "DapAn");

            migrationBuilder.DropIndex(
                name: "IX_DapAn_CauHoiId",
                table: "DapAn");

            migrationBuilder.DropColumn(
                name: "CauHoiId",
                table: "DapAn");

            migrationBuilder.CreateIndex(
                name: "IX_DapAn_IdCauHoi",
                table: "DapAn",
                column: "IdCauHoi");

            migrationBuilder.AddForeignKey(
                name: "FK_CauHoi_DapAn",
                table: "DapAn",
                column: "IdCauHoi",
                principalTable: "CauHoi",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CauHoi_DapAn",
                table: "DapAn");

            migrationBuilder.DropIndex(
                name: "IX_DapAn_IdCauHoi",
                table: "DapAn");

            migrationBuilder.AddColumn<long>(
                name: "CauHoiId",
                table: "DapAn",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_DapAn_CauHoiId",
                table: "DapAn",
                column: "CauHoiId");

            migrationBuilder.AddForeignKey(
                name: "FK_DapAn_CauHoi_CauHoiId",
                table: "DapAn",
                column: "CauHoiId",
                principalTable: "CauHoi",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

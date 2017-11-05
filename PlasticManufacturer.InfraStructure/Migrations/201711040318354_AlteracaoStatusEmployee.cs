namespace PlasticManufacturer.InfraStructure.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AlteracaoStatusEmployee : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Departments",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Description = c.String(),
                        CreationDate = c.DateTime(),
                        LastUpdate = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Genders",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Description = c.String(),
                        CreationDate = c.DateTime(),
                        LastUpdate = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.MaritalStatus",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Description = c.String(),
                        CreationDate = c.DateTime(),
                        LastUpdate = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Titles",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Description = c.String(),
                        CreationDate = c.DateTime(),
                        LastUpdate = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.Employees", "Status", c => c.Boolean());
            AddColumn("dbo.Employees", "LastName", c => c.String());
            AddColumn("dbo.Employees", "Birthday", c => c.DateTime());
            AddColumn("dbo.Employees", "Address", c => c.String());
            AddColumn("dbo.Employees", "ZipCode", c => c.String());
            AddColumn("dbo.Employees", "Telephone", c => c.String());
            AddColumn("dbo.Employees", "Ss", c => c.String());
            AddColumn("dbo.Employees", "HireDate", c => c.DateTime(nullable: false));
            AddColumn("dbo.Employees", "City_Id", c => c.Int());
            AddColumn("dbo.Employees", "Department_Id", c => c.Int());
            AddColumn("dbo.Employees", "Gender_Id", c => c.Int());
            AddColumn("dbo.Employees", "MaritalStatus_Id", c => c.Int());
            AddColumn("dbo.Employees", "State_Id", c => c.Int());
            AddColumn("dbo.Employees", "Title_Id", c => c.Int());
            CreateIndex("dbo.Employees", "City_Id");
            CreateIndex("dbo.Employees", "Department_Id");
            CreateIndex("dbo.Employees", "Gender_Id");
            CreateIndex("dbo.Employees", "MaritalStatus_Id");
            CreateIndex("dbo.Employees", "State_Id");
            CreateIndex("dbo.Employees", "Title_Id");
            AddForeignKey("dbo.Employees", "City_Id", "dbo.Cities", "Id");
            AddForeignKey("dbo.Employees", "Department_Id", "dbo.Departments", "Id");
            AddForeignKey("dbo.Employees", "Gender_Id", "dbo.Genders", "Id");
            AddForeignKey("dbo.Employees", "MaritalStatus_Id", "dbo.MaritalStatus", "Id");
            AddForeignKey("dbo.Employees", "State_Id", "dbo.States", "Id");
            AddForeignKey("dbo.Employees", "Title_Id", "dbo.Titles", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Employees", "Title_Id", "dbo.Titles");
            DropForeignKey("dbo.Employees", "State_Id", "dbo.States");
            DropForeignKey("dbo.Employees", "MaritalStatus_Id", "dbo.MaritalStatus");
            DropForeignKey("dbo.Employees", "Gender_Id", "dbo.Genders");
            DropForeignKey("dbo.Employees", "Department_Id", "dbo.Departments");
            DropForeignKey("dbo.Employees", "City_Id", "dbo.Cities");
            DropIndex("dbo.Employees", new[] { "Title_Id" });
            DropIndex("dbo.Employees", new[] { "State_Id" });
            DropIndex("dbo.Employees", new[] { "MaritalStatus_Id" });
            DropIndex("dbo.Employees", new[] { "Gender_Id" });
            DropIndex("dbo.Employees", new[] { "Department_Id" });
            DropIndex("dbo.Employees", new[] { "City_Id" });
            DropColumn("dbo.Employees", "Title_Id");
            DropColumn("dbo.Employees", "State_Id");
            DropColumn("dbo.Employees", "MaritalStatus_Id");
            DropColumn("dbo.Employees", "Gender_Id");
            DropColumn("dbo.Employees", "Department_Id");
            DropColumn("dbo.Employees", "City_Id");
            DropColumn("dbo.Employees", "HireDate");
            DropColumn("dbo.Employees", "Ss");
            DropColumn("dbo.Employees", "Telephone");
            DropColumn("dbo.Employees", "ZipCode");
            DropColumn("dbo.Employees", "Address");
            DropColumn("dbo.Employees", "Birthday");
            DropColumn("dbo.Employees", "LastName");
            DropColumn("dbo.Employees", "Status");
            DropTable("dbo.Titles");
            DropTable("dbo.MaritalStatus");
            DropTable("dbo.Genders");
            DropTable("dbo.Departments");
        }
    }
}

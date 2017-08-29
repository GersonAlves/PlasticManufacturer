namespace PlasticManufacturer.InfraStructure.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Categories_OperationTypes : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Categories",
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
                "dbo.OperationTypes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Description = c.String(),
                        CreationDate = c.DateTime(),
                        LastUpdate = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.RawMaterials", "Category_Id", c => c.Int());
            AddColumn("dbo.RawMaterials", "OperationType_Id", c => c.Int());
            CreateIndex("dbo.RawMaterials", "Category_Id");
            CreateIndex("dbo.RawMaterials", "OperationType_Id");
            AddForeignKey("dbo.RawMaterials", "Category_Id", "dbo.Categories", "Id");
            AddForeignKey("dbo.RawMaterials", "OperationType_Id", "dbo.OperationTypes", "Id");
            DropColumn("dbo.RawMaterials", "OperationType");
            DropColumn("dbo.RawMaterials", "Category");
        }
        
        public override void Down()
        {
            AddColumn("dbo.RawMaterials", "Category", c => c.String());
            AddColumn("dbo.RawMaterials", "OperationType", c => c.String());
            DropForeignKey("dbo.RawMaterials", "OperationType_Id", "dbo.OperationTypes");
            DropForeignKey("dbo.RawMaterials", "Category_Id", "dbo.Categories");
            DropIndex("dbo.RawMaterials", new[] { "OperationType_Id" });
            DropIndex("dbo.RawMaterials", new[] { "Category_Id" });
            DropColumn("dbo.RawMaterials", "OperationType_Id");
            DropColumn("dbo.RawMaterials", "Category_Id");
            DropTable("dbo.OperationTypes");
            DropTable("dbo.Categories");
        }
    }
}

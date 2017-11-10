namespace PlasticManufacturer.InfraStructure.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class StartModel : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.AddressTypes",
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
                "dbo.Carriers",
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
                "dbo.Cities",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Description = c.String(),
                        CreationDate = c.DateTime(),
                        LastUpdate = c.DateTime(),
                        State_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.States", t => t.State_Id)
                .Index(t => t.State_Id);
            
            CreateTable(
                "dbo.ColorCustomerAddresses",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Description = c.String(),
                        CreationDate = c.DateTime(),
                        LastUpdate = c.DateTime(),
                        CustomerAddress_Id = c.Int(),
                        ColorMatchRequest_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.CustomerAddresses", t => t.CustomerAddress_Id)
                .ForeignKey("dbo.ColorMatchRequests", t => t.ColorMatchRequest_Id)
                .Index(t => t.CustomerAddress_Id)
                .Index(t => t.ColorMatchRequest_Id);
            
            CreateTable(
                "dbo.CustomerAddresses",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Street = c.String(),
                        Complement = c.String(),
                        ZipCode = c.String(),
                        Phone = c.String(),
                        Fax = c.String(),
                        Name = c.String(),
                        Description = c.String(),
                        CreationDate = c.DateTime(),
                        LastUpdate = c.DateTime(),
                        AddressType_Id = c.Int(),
                        City_Id = c.Int(),
                        State_Id = c.Int(),
                        Customer_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AddressTypes", t => t.AddressType_Id)
                .ForeignKey("dbo.Cities", t => t.City_Id)
                .ForeignKey("dbo.States", t => t.State_Id)
                .ForeignKey("dbo.Customers", t => t.Customer_Id)
                .Index(t => t.AddressType_Id)
                .Index(t => t.City_Id)
                .Index(t => t.State_Id)
                .Index(t => t.Customer_Id);
            
            CreateTable(
                "dbo.States",
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
                "dbo.ColorMatchRequests",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        LoteId = c.Int(nullable: false),
                        ProductDescription = c.String(),
                        ProductAplication = c.String(),
                        PriceQuoteRequired = c.Boolean(nullable: false),
                        TargetTypeField = c.String(),
                        SurfaceMatte = c.Boolean(nullable: false),
                        SurfaceGlossy = c.Boolean(nullable: false),
                        SurfaceOthers = c.String(),
                        WallThickness = c.String(),
                        Injection = c.Boolean(nullable: false),
                        Blow = c.Boolean(nullable: false),
                        Compression = c.Boolean(nullable: false),
                        Extrusion = c.Boolean(nullable: false),
                        FiberDenier = c.Boolean(nullable: false),
                        CoEx = c.Boolean(nullable: false),
                        MeltIndex = c.String(),
                        Film = c.Boolean(nullable: false),
                        Sheet = c.Boolean(nullable: false),
                        Rotational = c.Boolean(nullable: false),
                        Mfg = c.String(),
                        GasAssitInjection = c.Boolean(nullable: false),
                        Exact = c.Boolean(nullable: false),
                        Commercial = c.Boolean(nullable: false),
                        ClosestSTD = c.String(),
                        MoreDe = c.String(),
                        CieLab = c.Boolean(nullable: false),
                        D65 = c.Boolean(nullable: false),
                        Cfw = c.Boolean(nullable: false),
                        A = c.Boolean(nullable: false),
                        ChipsQty = c.Int(nullable: false),
                        TubeSample = c.Boolean(nullable: false),
                        SheetExtrusionSample = c.Boolean(nullable: false),
                        RequiredCustomerQty = c.Decimal(nullable: false, precision: 18, scale: 2),
                        UnitQty = c.Decimal(nullable: false, precision: 18, scale: 2),
                        RequiredRatio = c.String(),
                        Interior = c.Boolean(nullable: false),
                        Exterior = c.Boolean(nullable: false),
                        LightLastness = c.String(),
                        Hour = c.DateTime(),
                        New = c.Boolean(nullable: false),
                        Reason = c.String(),
                        Uv = c.Boolean(nullable: false),
                        UvPackage = c.String(),
                        IsAntiOxidant = c.Boolean(nullable: false),
                        AntiOxidant = c.String(),
                        IsAntiStat = c.Boolean(nullable: false),
                        AntiStat = c.String(),
                        AdditiveNone = c.Boolean(nullable: false),
                        IsLubricant = c.Boolean(nullable: false),
                        Lubricant = c.String(),
                        Amount = c.String(),
                        AdditiveOther = c.String(),
                        BestAdditive = c.Boolean(nullable: false),
                        Slip = c.Boolean(nullable: false),
                        Price = c.Int(),
                        Accuracy = c.Int(),
                        Turnaround = c.Int(),
                        ConcernNone = c.Boolean(nullable: false),
                        ConcernOther = c.String(),
                        Fda = c.Boolean(nullable: false),
                        NonHm = c.Boolean(nullable: false),
                        RequirementNone = c.Boolean(nullable: false),
                        RequirementOther = c.String(),
                        MaximumHeat = c.String(),
                        Coa = c.Boolean(nullable: false),
                        Msds = c.Boolean(nullable: false),
                        Cie = c.Boolean(nullable: false),
                        MateriaSeet = c.Boolean(nullable: false),
                        FdaLetter = c.Boolean(nullable: false),
                        UvLetter = c.Boolean(nullable: false),
                        LogoChips = c.Boolean(nullable: false),
                        CustomerDueDate = c.DateTime(),
                        Name = c.String(),
                        Description = c.String(),
                        CreationDate = c.DateTime(),
                        LastUpdate = c.DateTime(),
                        Carrier_Id = c.Int(),
                        Customer_Id = c.Int(),
                        CustomerResin_Id = c.Int(),
                        CustomerShipViaAccount_Id = c.Int(),
                        Opacity_Id = c.Int(),
                        Packaging_Id = c.Int(),
                        Pellet_Id = c.Int(),
                        Product_Id = c.Int(),
                        Reformulation_Id = c.Int(),
                        TargetType_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Carriers", t => t.Carrier_Id)
                .ForeignKey("dbo.Customers", t => t.Customer_Id)
                .ForeignKey("dbo.CustomerResins", t => t.CustomerResin_Id)
                .ForeignKey("dbo.CustomerShipViaAccounts", t => t.CustomerShipViaAccount_Id)
                .ForeignKey("dbo.Opacities", t => t.Opacity_Id)
                .ForeignKey("dbo.Packagings", t => t.Packaging_Id)
                .ForeignKey("dbo.Pellets", t => t.Pellet_Id)
                .ForeignKey("dbo.Products", t => t.Product_Id)
                .ForeignKey("dbo.Products", t => t.Reformulation_Id)
                .ForeignKey("dbo.TargetTypes", t => t.TargetType_Id)
                .Index(t => t.Carrier_Id)
                .Index(t => t.Customer_Id)
                .Index(t => t.CustomerResin_Id)
                .Index(t => t.CustomerShipViaAccount_Id)
                .Index(t => t.Opacity_Id)
                .Index(t => t.Packaging_Id)
                .Index(t => t.Pellet_Id)
                .Index(t => t.Product_Id)
                .Index(t => t.Reformulation_Id)
                .Index(t => t.TargetType_Id);
            
            CreateTable(
                "dbo.Customers",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        LastName = c.String(),
                        Code = c.String(),
                        Rating_Id = c.Int(),
                        Status_Id = c.Int(),
                        Prospect = c.Boolean(),
                        Lead = c.Boolean(),
                        SalesRepresentant_Id = c.Int(),
                        AuthorizedBy_Id = c.Int(),
                        ContactedBy_Id = c.Int(),
                        FedId = c.Int(),
                        Notes = c.String(),
                        Name = c.String(),
                        Description = c.String(),
                        CreationDate = c.DateTime(),
                        LastUpdate = c.DateTime(),
                        CustomerDefault_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Employees", t => t.AuthorizedBy_Id)
                .ForeignKey("dbo.CustomerContacteds", t => t.ContactedBy_Id)
                .ForeignKey("dbo.CustomerDefaults", t => t.CustomerDefault_Id)
                .ForeignKey("dbo.CustomerRatings", t => t.Rating_Id)
                .ForeignKey("dbo.Employees", t => t.SalesRepresentant_Id)
                .ForeignKey("dbo.CustomerStatus", t => t.Status_Id)
                .Index(t => t.Rating_Id)
                .Index(t => t.Status_Id)
                .Index(t => t.SalesRepresentant_Id)
                .Index(t => t.AuthorizedBy_Id)
                .Index(t => t.ContactedBy_Id)
                .Index(t => t.CustomerDefault_Id);
            
            CreateTable(
                "dbo.Employees",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Email = c.String(),
                        Status = c.Boolean(),
                        LastName = c.String(),
                        Birthday = c.DateTime(),
                        Gender_Id = c.Int(),
                        MaritalStatus_Id = c.Int(),
                        Address = c.String(),
                        City_Id = c.Int(),
                        State_Id = c.Int(),
                        ZipCode = c.String(),
                        Telephone = c.String(),
                        Ss = c.String(),
                        HireDate = c.DateTime(),
                        Title_Id = c.Int(),
                        Department_Id = c.Int(),
                        Name = c.String(),
                        Description = c.String(),
                        CreationDate = c.DateTime(),
                        LastUpdate = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Cities", t => t.City_Id)
                .ForeignKey("dbo.Departments", t => t.Department_Id)
                .ForeignKey("dbo.Genders", t => t.Gender_Id)
                .ForeignKey("dbo.MaritalStatus", t => t.MaritalStatus_Id)
                .ForeignKey("dbo.States", t => t.State_Id)
                .ForeignKey("dbo.Titles", t => t.Title_Id)
                .Index(t => t.Gender_Id)
                .Index(t => t.MaritalStatus_Id)
                .Index(t => t.City_Id)
                .Index(t => t.State_Id)
                .Index(t => t.Title_Id)
                .Index(t => t.Department_Id);
            
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
            
            CreateTable(
                "dbo.CustomerContacteds",
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
                "dbo.CustomerDefaults",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Freight_Id = c.Int(),
                        FreightDescription = c.String(),
                        MailingList = c.Boolean(),
                        MutipleSites = c.Boolean(),
                        Reference = c.String(),
                        SecondLabel_Id = c.Int(),
                        Note = c.String(),
                        Name = c.String(),
                        Description = c.String(),
                        CreationDate = c.DateTime(),
                        LastUpdate = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Freights", t => t.Freight_Id)
                .ForeignKey("dbo.SecondLabels", t => t.SecondLabel_Id)
                .Index(t => t.Freight_Id)
                .Index(t => t.SecondLabel_Id);
            
            CreateTable(
                "dbo.Freights",
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
                "dbo.SecondLabels",
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
                "dbo.CustomerRatings",
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
                "dbo.CustomerShipViaAccounts",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Description = c.String(),
                        CreationDate = c.DateTime(),
                        LastUpdate = c.DateTime(),
                        ShippingMethod_Id = c.Int(),
                        Customer_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.ShippingMethods", t => t.ShippingMethod_Id)
                .ForeignKey("dbo.Customers", t => t.Customer_Id)
                .Index(t => t.ShippingMethod_Id)
                .Index(t => t.Customer_Id);
            
            CreateTable(
                "dbo.ShippingMethods",
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
                "dbo.CustomerStatus",
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
                "dbo.CustomerResins",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ResinType = c.String(),
                        Quantidade = c.Int(nullable: false),
                        Code = c.String(),
                        Name = c.String(),
                        Description = c.String(),
                        CreationDate = c.DateTime(),
                        LastUpdate = c.DateTime(),
                        Customer_Id = c.Int(),
                        UnitMeasurement_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Customers", t => t.Customer_Id)
                .ForeignKey("dbo.UnitMeasurements", t => t.UnitMeasurement_Id)
                .Index(t => t.Customer_Id)
                .Index(t => t.UnitMeasurement_Id);
            
            CreateTable(
                "dbo.UnitMeasurements",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Code = c.String(),
                        Name = c.String(),
                        Description = c.String(),
                        CreationDate = c.DateTime(),
                        LastUpdate = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Opacities",
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
                "dbo.Packagings",
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
                "dbo.Pellets",
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
                "dbo.Products",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Description = c.String(),
                        CreationDate = c.DateTime(),
                        LastUpdate = c.DateTime(),
                        Formula_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Formulae", t => t.Formula_Id)
                .Index(t => t.Formula_Id);
            
            CreateTable(
                "dbo.Formulae",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Description = c.String(),
                        CreationDate = c.DateTime(),
                        LastUpdate = c.DateTime(),
                        FormulaLine_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.FormulaLines", t => t.FormulaLine_Id)
                .Index(t => t.FormulaLine_Id);
            
            CreateTable(
                "dbo.FormulaLines",
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
                "dbo.TargetTypes",
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
                "dbo.Costs",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Value = c.Decimal(nullable: false, precision: 18, scale: 2),
                        RawMaterialId = c.Int(nullable: false),
                        Name = c.String(),
                        Description = c.String(),
                        CreationDate = c.DateTime(),
                        LastUpdate = c.DateTime(),
                        Currency_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Currencies", t => t.Currency_Id)
                .ForeignKey("dbo.RawMaterials", t => t.RawMaterialId, cascadeDelete: true)
                .Index(t => t.RawMaterialId)
                .Index(t => t.Currency_Id);
            
            CreateTable(
                "dbo.Currencies",
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
            
            CreateTable(
                "dbo.RawMaterials",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Code = c.String(),
                        Notes = c.String(),
                        ChemicalName = c.String(),
                        Status = c.Boolean(nullable: false),
                        MainSupplier = c.String(),
                        MainCustomer = c.String(),
                        HeatStability = c.String(),
                        LightSatability = c.String(),
                        Fda = c.Boolean(nullable: false),
                        Hbfb = c.Boolean(nullable: false),
                        QCRequired = c.Boolean(nullable: false),
                        BarCode = c.String(),
                        Name = c.String(),
                        Description = c.String(),
                        CreationDate = c.DateTime(),
                        LastUpdate = c.DateTime(),
                        Category_Id = c.Int(),
                        OperationType_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Categories", t => t.Category_Id)
                .ForeignKey("dbo.OperationTypes", t => t.OperationType_Id)
                .Index(t => t.Category_Id)
                .Index(t => t.OperationType_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.RawMaterials", "OperationType_Id", "dbo.OperationTypes");
            DropForeignKey("dbo.Costs", "RawMaterialId", "dbo.RawMaterials");
            DropForeignKey("dbo.RawMaterials", "Category_Id", "dbo.Categories");
            DropForeignKey("dbo.Costs", "Currency_Id", "dbo.Currencies");
            DropForeignKey("dbo.ColorMatchRequests", "TargetType_Id", "dbo.TargetTypes");
            DropForeignKey("dbo.ColorMatchRequests", "Reformulation_Id", "dbo.Products");
            DropForeignKey("dbo.ColorMatchRequests", "Product_Id", "dbo.Products");
            DropForeignKey("dbo.Products", "Formula_Id", "dbo.Formulae");
            DropForeignKey("dbo.Formulae", "FormulaLine_Id", "dbo.FormulaLines");
            DropForeignKey("dbo.ColorMatchRequests", "Pellet_Id", "dbo.Pellets");
            DropForeignKey("dbo.ColorMatchRequests", "Packaging_Id", "dbo.Packagings");
            DropForeignKey("dbo.ColorMatchRequests", "Opacity_Id", "dbo.Opacities");
            DropForeignKey("dbo.ColorMatchRequests", "CustomerShipViaAccount_Id", "dbo.CustomerShipViaAccounts");
            DropForeignKey("dbo.ColorMatchRequests", "CustomerResin_Id", "dbo.CustomerResins");
            DropForeignKey("dbo.CustomerResins", "UnitMeasurement_Id", "dbo.UnitMeasurements");
            DropForeignKey("dbo.CustomerResins", "Customer_Id", "dbo.Customers");
            DropForeignKey("dbo.ColorMatchRequests", "Customer_Id", "dbo.Customers");
            DropForeignKey("dbo.Customers", "Status_Id", "dbo.CustomerStatus");
            DropForeignKey("dbo.CustomerShipViaAccounts", "Customer_Id", "dbo.Customers");
            DropForeignKey("dbo.CustomerShipViaAccounts", "ShippingMethod_Id", "dbo.ShippingMethods");
            DropForeignKey("dbo.Customers", "SalesRepresentant_Id", "dbo.Employees");
            DropForeignKey("dbo.Customers", "Rating_Id", "dbo.CustomerRatings");
            DropForeignKey("dbo.Customers", "CustomerDefault_Id", "dbo.CustomerDefaults");
            DropForeignKey("dbo.CustomerDefaults", "SecondLabel_Id", "dbo.SecondLabels");
            DropForeignKey("dbo.CustomerDefaults", "Freight_Id", "dbo.Freights");
            DropForeignKey("dbo.Customers", "ContactedBy_Id", "dbo.CustomerContacteds");
            DropForeignKey("dbo.Customers", "AuthorizedBy_Id", "dbo.Employees");
            DropForeignKey("dbo.Employees", "Title_Id", "dbo.Titles");
            DropForeignKey("dbo.Employees", "State_Id", "dbo.States");
            DropForeignKey("dbo.Employees", "MaritalStatus_Id", "dbo.MaritalStatus");
            DropForeignKey("dbo.Employees", "Gender_Id", "dbo.Genders");
            DropForeignKey("dbo.Employees", "Department_Id", "dbo.Departments");
            DropForeignKey("dbo.Employees", "City_Id", "dbo.Cities");
            DropForeignKey("dbo.CustomerAddresses", "Customer_Id", "dbo.Customers");
            DropForeignKey("dbo.ColorCustomerAddresses", "ColorMatchRequest_Id", "dbo.ColorMatchRequests");
            DropForeignKey("dbo.ColorMatchRequests", "Carrier_Id", "dbo.Carriers");
            DropForeignKey("dbo.ColorCustomerAddresses", "CustomerAddress_Id", "dbo.CustomerAddresses");
            DropForeignKey("dbo.CustomerAddresses", "State_Id", "dbo.States");
            DropForeignKey("dbo.Cities", "State_Id", "dbo.States");
            DropForeignKey("dbo.CustomerAddresses", "City_Id", "dbo.Cities");
            DropForeignKey("dbo.CustomerAddresses", "AddressType_Id", "dbo.AddressTypes");
            DropIndex("dbo.RawMaterials", new[] { "OperationType_Id" });
            DropIndex("dbo.RawMaterials", new[] { "Category_Id" });
            DropIndex("dbo.Costs", new[] { "Currency_Id" });
            DropIndex("dbo.Costs", new[] { "RawMaterialId" });
            DropIndex("dbo.Formulae", new[] { "FormulaLine_Id" });
            DropIndex("dbo.Products", new[] { "Formula_Id" });
            DropIndex("dbo.CustomerResins", new[] { "UnitMeasurement_Id" });
            DropIndex("dbo.CustomerResins", new[] { "Customer_Id" });
            DropIndex("dbo.CustomerShipViaAccounts", new[] { "Customer_Id" });
            DropIndex("dbo.CustomerShipViaAccounts", new[] { "ShippingMethod_Id" });
            DropIndex("dbo.CustomerDefaults", new[] { "SecondLabel_Id" });
            DropIndex("dbo.CustomerDefaults", new[] { "Freight_Id" });
            DropIndex("dbo.Employees", new[] { "Department_Id" });
            DropIndex("dbo.Employees", new[] { "Title_Id" });
            DropIndex("dbo.Employees", new[] { "State_Id" });
            DropIndex("dbo.Employees", new[] { "City_Id" });
            DropIndex("dbo.Employees", new[] { "MaritalStatus_Id" });
            DropIndex("dbo.Employees", new[] { "Gender_Id" });
            DropIndex("dbo.Customers", new[] { "CustomerDefault_Id" });
            DropIndex("dbo.Customers", new[] { "ContactedBy_Id" });
            DropIndex("dbo.Customers", new[] { "AuthorizedBy_Id" });
            DropIndex("dbo.Customers", new[] { "SalesRepresentant_Id" });
            DropIndex("dbo.Customers", new[] { "Status_Id" });
            DropIndex("dbo.Customers", new[] { "Rating_Id" });
            DropIndex("dbo.ColorMatchRequests", new[] { "TargetType_Id" });
            DropIndex("dbo.ColorMatchRequests", new[] { "Reformulation_Id" });
            DropIndex("dbo.ColorMatchRequests", new[] { "Product_Id" });
            DropIndex("dbo.ColorMatchRequests", new[] { "Pellet_Id" });
            DropIndex("dbo.ColorMatchRequests", new[] { "Packaging_Id" });
            DropIndex("dbo.ColorMatchRequests", new[] { "Opacity_Id" });
            DropIndex("dbo.ColorMatchRequests", new[] { "CustomerShipViaAccount_Id" });
            DropIndex("dbo.ColorMatchRequests", new[] { "CustomerResin_Id" });
            DropIndex("dbo.ColorMatchRequests", new[] { "Customer_Id" });
            DropIndex("dbo.ColorMatchRequests", new[] { "Carrier_Id" });
            DropIndex("dbo.CustomerAddresses", new[] { "Customer_Id" });
            DropIndex("dbo.CustomerAddresses", new[] { "State_Id" });
            DropIndex("dbo.CustomerAddresses", new[] { "City_Id" });
            DropIndex("dbo.CustomerAddresses", new[] { "AddressType_Id" });
            DropIndex("dbo.ColorCustomerAddresses", new[] { "ColorMatchRequest_Id" });
            DropIndex("dbo.ColorCustomerAddresses", new[] { "CustomerAddress_Id" });
            DropIndex("dbo.Cities", new[] { "State_Id" });
            DropTable("dbo.RawMaterials");
            DropTable("dbo.OperationTypes");
            DropTable("dbo.Currencies");
            DropTable("dbo.Costs");
            DropTable("dbo.TargetTypes");
            DropTable("dbo.FormulaLines");
            DropTable("dbo.Formulae");
            DropTable("dbo.Products");
            DropTable("dbo.Pellets");
            DropTable("dbo.Packagings");
            DropTable("dbo.Opacities");
            DropTable("dbo.UnitMeasurements");
            DropTable("dbo.CustomerResins");
            DropTable("dbo.CustomerStatus");
            DropTable("dbo.ShippingMethods");
            DropTable("dbo.CustomerShipViaAccounts");
            DropTable("dbo.CustomerRatings");
            DropTable("dbo.SecondLabels");
            DropTable("dbo.Freights");
            DropTable("dbo.CustomerDefaults");
            DropTable("dbo.CustomerContacteds");
            DropTable("dbo.Titles");
            DropTable("dbo.MaritalStatus");
            DropTable("dbo.Genders");
            DropTable("dbo.Departments");
            DropTable("dbo.Employees");
            DropTable("dbo.Customers");
            DropTable("dbo.ColorMatchRequests");
            DropTable("dbo.States");
            DropTable("dbo.CustomerAddresses");
            DropTable("dbo.ColorCustomerAddresses");
            DropTable("dbo.Cities");
            DropTable("dbo.Categories");
            DropTable("dbo.Carriers");
            DropTable("dbo.AddressTypes");
        }
    }
}

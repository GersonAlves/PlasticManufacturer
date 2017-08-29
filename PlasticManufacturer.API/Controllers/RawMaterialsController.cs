using PlasticManufacturer.API.Models.RawMaterial;
using PlasticManufacturer.Domain.Entities.RawMaterial;
using PlasticManufacturer.Domain.Repository;
using PlasticManufacturer.InfraStructure.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace PlasticManufacturer.API.Controllers
{
    [EnableCorsAttribute("*", "*", "*")]
    public class RawMaterialsController : ApiController
    {
        IRepository<RawMaterial> repository;

        public RawMaterialsController()
        {
            repository = new RawMaterialRepository();   
        }

        public IHttpActionResult Post(RawMaterial entity)
        {
            repository.Add(entity);
            return Ok();
        }

        public IHttpActionResult Get()
        {
            var rawMaterials = repository.GetAll();
            // FillRawMaterialModel(rawMaterials)
            return Ok(rawMaterials);
        }
            
        //private IList<RawMaterialModels> FillRawMaterialModel(IList<RawMaterial> rawMaterials)
        //{
        //    var rawMaterialsModels = new List<RawMaterialModels>();
        //    var rawMaterialModel = new RawMaterialModels();

        //    foreach (var rawMat in rawMaterials)
        //    {

        //        rawMaterialModel.Id = rawMat.Id;
        //        rawMaterialModel.Name = rawMat.Name;
        //        rawMaterialModel.Description = rawMat.Description;
        //        rawMaterialModel.CreationDate = rawMat.CreationDate;
        //        rawMaterialModel.LastUpdate = rawMat.LastUpdate;
        //        rawMaterialModel.Code = rawMat.Code;
        //        rawMaterialModel.Notes = rawMat.Notes;
        //        rawMaterialModel.ChemicalName = rawMat.ChemicalName;
        //        rawMaterialModel.Status = rawMat.Status;
        //        rawMaterialModel.OperationType = rawMat.OperationType;
        //        rawMaterialModel.Category = rawMat.Category;
        //        rawMaterialModel.MainSupplier = rawMat.MainSupplier;
        //        rawMaterialModel.MainCustomer = rawMat.MainCustomer;
        //        rawMaterialModel.HeatStability = rawMat.HeatStability;
        //        rawMaterialModel.LightSatability = rawMat.LightSatability;
        //        rawMaterialModel.Fda = rawMat.Fda;
        //        rawMaterialModel.Hbfb = rawMat.Hbfb;
        //        rawMaterialModel.QCRequired = rawMat.QCRequired;
        //        rawMaterialModel.BarCode = rawMat.BarCode;
                                 
        //        foreach (var cost in rawMat.Costs)
        //        {
        //            rawMaterialModel.CostModel.Value = cost.Value;
        //            rawMaterialModel.CostModel.Name = cost.Name;
        //            rawMaterialModel.CostModel.Description = cost.Description;

        //        }
        //        rawMaterialsModels.Add(rawMaterialModel);
        //    }

        //    return rawMaterialsModels;
        //}

        public IHttpActionResult Get(int id)
        {
            return Ok(repository.GetById(id));
        }


    }
}

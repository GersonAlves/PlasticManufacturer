using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using PlasticManufacturer.Domain.Entities.RawMaterial;
using PlasticManufacturer.InfraStructure.Context;

namespace PlasticManufacturer.API.Controllers
{
    public class OperationTypesController : ApiController
    {
        private PlasticManufacturerContext db = new PlasticManufacturerContext();

        // GET: api/OperationTypes
        public IQueryable<OperationType> GetOperationTypes()
        {
            return db.OperationTypes;
        }

        // GET: api/OperationTypes/5
        [ResponseType(typeof(OperationType))]
        public async Task<IHttpActionResult> GetOperationType(int id)
        {
            OperationType operationType = await db.OperationTypes.FindAsync(id);
            if (operationType == null)
            {
                return NotFound();
            }

            return Ok(operationType);
        }

        // PUT: api/OperationTypes/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutOperationType(int id, OperationType operationType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != operationType.Id)
            {
                return BadRequest();
            }

            db.Entry(operationType).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OperationTypeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/OperationTypes
        [ResponseType(typeof(OperationType))]
        public async Task<IHttpActionResult> PostOperationType(OperationType operationType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.OperationTypes.Add(operationType);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = operationType.Id }, operationType);
        }

        // DELETE: api/OperationTypes/5
        [ResponseType(typeof(OperationType))]
        public async Task<IHttpActionResult> DeleteOperationType(int id)
        {
            OperationType operationType = await db.OperationTypes.FindAsync(id);
            if (operationType == null)
            {
                return NotFound();
            }

            db.OperationTypes.Remove(operationType);
            await db.SaveChangesAsync();

            return Ok(operationType);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool OperationTypeExists(int id)
        {
            return db.OperationTypes.Count(e => e.Id == id) > 0;
        }
    }
}
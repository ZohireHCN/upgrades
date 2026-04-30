const content = `
  <div style="width:340px;padding:14px;font-family:Arial;position:relative">

    <!-- CLOSE -->
    <button id="close-info"
      style="position:absolute;top:8px;right:8px;border:none;background:transparent;font-size:18px;cursor:pointer">
      ✕
    </button>

    <div>
      <h3 style="margin:0;color:#2f6f4f">${study.t01Reference}</h3>
      <p style="margin:8px 0;color:#555">${study.t01Address}</p>
    </div>

    <button id="streetview-btn"
      style="background:#79c143;color:white;border:none;border-radius:8px;padding:10px 16px;font-weight:700;cursor:pointer">
      StreetView
    </button>

    <div style="margin-top:14px;border:1px solid #ddd;border-radius:8px;padding:10px">
      <strong>Document(s)</strong>

      <div style="margin-top:8px;color:#666">
        ${
          study.t12DocumentsResponse?.length
            ? study.t12DocumentsResponse.map(doc => `
                <div style="display:flex;justify-content:space-between;align-items:center;margin-top:6px">
                  <span>Doc ${doc.id} - pos ${doc.position}</span>

                  <button class="delete-doc-btn" data-id="${doc.id}"
                    style="border:none;background:transparent;color:red;cursor:pointer">
                    🗑
                  </button>
                </div>
              `).join('')
            : 'No records found.'
        }
      </div>
    </div>

    <button id="add-doc-btn"
      style="margin-top:14px;background:white;border:none;color:#2f6f4f;font-weight:700;cursor:pointer">
      + Ajouter un document
    </button>

  </div>


setTimeout(() => {

  // CLOSE
  document.getElementById('close-info')?.addEventListener('click', () => {
    this.nativeInfoWindow.close();
    this.selectedStudy = null;
  });

  // STREETVIEW
  document.getElementById('streetview-btn')?.addEventListener('click', () => {
    this.openStreetView(study);
  });

  // ADD DOC
  document.getElementById('add-doc-btn')?.addEventListener('click', () => {
    this.addDocument();
  });

  // DELETE DOC (multi boutons)
  document.querySelectorAll('.delete-doc-btn').forEach(btn => {
    btn.addEventListener('click', (event: any) => {
      const docId = event.target.getAttribute('data-id');
      this.deleteDocument(+docId);
    });
  });

});



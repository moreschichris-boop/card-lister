'use client'

import { useState } from 'react'

export default function CardLister() {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [conditionType, setConditionType] = useState<'raw' | 'graded'>('raw')
  const [condition, setCondition] = useState('')
  const [gradingCompany, setGradingCompany] = useState('')
  const [grade, setGrade] = useState('')
  const [certNumber, setCertNumber] = useState('')
  const [photos, setPhotos] = useState<File[]>([])

  const checkComps = () => {
    if (!title.trim()) {
      alert('Enter a title first')
      return
    }
    const query = encodeURIComponent(title)
    const url = `https://www.ebay.com/sch/i.html?_nkw=${query}&LH_Sold=1&LH_Complete=1`
    window.open(url, '_blank')
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos(Array.from(e.target.files))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({
      title,
      price,
      conditionType,
      condition,
      gradingCompany,
      grade,
      certNumber,
      photos,
    })
    alert('Form captured (eBay publish + logging coming next)')
  }

  return (
    <div style={{ maxWidth: 500, margin: '40px auto', padding: '0 16px', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: 24, marginBottom: 24 }}>Card Lister</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 4 }}>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: '100%', padding: 8, boxSizing: 'border-box' }}
            placeholder="2023 Bowman Chrome Elly De La Cruz Auto PSA 10"
          />
          <button
            type="button"
            onClick={checkComps}
            style={{ marginTop: 8, padding: '6px 12px', cursor: 'pointer' }}
          >
            Check Comps
          </button>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 4 }}>Price ($)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={{ width: '100%', padding: 8, boxSizing: 'border-box' }}
            placeholder="25.00"
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 4 }}>Condition Type</label>
          <div>
            <label style={{ marginRight: 16 }}>
              <input
                type="radio"
                checked={conditionType === 'raw'}
                onChange={() => setConditionType('raw')}
              />
              {' '}Raw
            </label>
            <label>
              <input
                type="radio"
                checked={conditionType === 'graded'}
                onChange={() => setConditionType('graded')}
              />
              {' '}Graded
            </label>
          </div>
        </div>

        {conditionType === 'raw' ? (
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 4 }}>Condition</label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              style={{ width: '100%', padding: 8 }}
            >
              <option value="">Select condition</option>
              <option value="Near Mint or Better">Near Mint or Better</option>
              <option value="Excellent">Excellent</option>
              <option value="Very Good">Very Good</option>
              <option value="Poor">Poor</option>
            </select>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', marginBottom: 4 }}>Grading Company</label>
              <select
                value={gradingCompany}
                onChange={(e) => setGradingCompany(e.target.value)}
                style={{ width: '100%', padding: 8 }}
              >
                <option value="">Select company</option>
                <option value="PSA">PSA</option>
                <option value="BGS">BGS</option>
                <option value="SGC">SGC</option>
                <option value="CSG">CSG</option>
              </select>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', marginBottom: 4 }}>Grade</label>
              <input
                type="text"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                style={{ width: '100%', padding: 8, boxSizing: 'border-box' }}
                placeholder="10"
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', marginBottom: 4 }}>Cert Number</label>
              <input
                type="text"
                value={certNumber}
                onChange={(e) => setCertNumber(e.target.value)}
                style={{ width: '100%', padding: 8, boxSizing: 'border-box' }}
                placeholder="123456789"
              />
            </div>
          </>
        )}

        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', marginBottom: 4 }}>Photos</label>
          <input type="file" accept="image/*" multiple onChange={handlePhotoChange} />
          {photos.length > 0 && (
            <p style={{ fontSize: 13, color: '#555' }}>{photos.length} photo(s) selected</p>
          )}
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: 12,
            background: '#111',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
            fontSize: 16,
          }}
        >
          Publish Listing
        </button>
      </form>
    </div>
  )
}
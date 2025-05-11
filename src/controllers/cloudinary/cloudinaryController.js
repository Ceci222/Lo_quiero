function getCloudinaryConfig(req, res) {
    try {
        res.json({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
        });
    } catch (error) {
        console.error('Error al obtener config de Cloudinary:', error);
        res.status(500).json({ error: 'Error interno' });
    }
}

export default { getCloudinaryConfig };